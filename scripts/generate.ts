import { walk } from 'https://deno.land/std@0.224.0/fs/walk.ts'
import { ensureDir } from 'https://deno.land/std@0.224.0/fs/ensure_dir.ts'
import { basename, dirname, fromFileUrl, resolve } from 'https://deno.land/std@0.224.0/path/mod.ts'
import sharp from 'sharp'

const __dirname = dirname(fromFileUrl(import.meta.url))
const ROOT_DIR = resolve(__dirname, '..')

const CONFIG = {
	sizes: [16, 32, 64, 128, 256, 512, 1024],
	formats: ['png', 'jpeg', 'webp'] as const,
	inputDir: resolve(ROOT_DIR, 'scripts/input'),
	outputDir: resolve(ROOT_DIR, 'public/assets'),
	sets: ['animals'] as const,
	concurrency: 4,
}

let processed = 0
let total = 0

async function processImage(entryPath: string, set: string) {
	const base = basename(entryPath, '.png')
	const data = await Deno.readFile(entryPath)

	const tasks = CONFIG.sizes.flatMap((size) =>
		CONFIG.formats.map(async (format) => {
			try {
				const outputPath = resolve(CONFIG.outputDir, set, String(size), `${base}.${format}`)
				const outputDir = dirname(outputPath)
				await ensureDir(outputDir)

				await sharp(data).resize(size, size).toFormat(format).toFile(outputPath)

				processed++
				console.log(`[${processed}/${total}] Procesado: ${outputPath}`)
			} catch (error) {
				console.error(`Error procesando ${entryPath}:`, error)
			}
		}),
	)

	for (let i = 0; i < tasks.length; i += CONFIG.concurrency) {
		await Promise.all(tasks.slice(i, i + CONFIG.concurrency))
	}
}

async function generate() {
	console.log('Iniciando generación de imágenes...')
	const startTime = Date.now()

	try {
		await Deno.stat(CONFIG.inputDir)
	} catch (error) {
		if (error instanceof Deno.errors.NotFound) {
			console.error(`❌ Error: El directorio de entrada no existe: ${CONFIG.inputDir}`)
			console.log('Por favor, crea el directorio y añade imágenes PNG en:', CONFIG.inputDir)
			return
		}
		throw error
	}

	for (const set of CONFIG.sets) {
		const setPath = resolve(CONFIG.inputDir, set)
		console.log(`\nProcesando set: ${set} (${setPath})`)

		try {
			await Deno.stat(setPath)
		} catch (error) {
			if (error instanceof Deno.errors.NotFound) {
				console.log(`⚠️  No se encontró el directorio del set: ${setPath}`)
				continue
			}
			throw error
		}

		const entries = []
		for await (const entry of walk(setPath, {
			maxDepth: 1,
			exts: ['.png'],
			includeDirs: false,
		})) {
			entries.push(entry.path)
		}

		if (entries.length === 0) {
			console.log(`⚠️  No se encontraron archivos PNG en: ${setPath}`)
			continue
		}

		console.log(`🔍 Encontradas ${entries.length} imágenes en ${set}`)
		total += entries.length * CONFIG.sizes.length * CONFIG.formats.length

		for (let i = 0; i < entries.length; i += CONFIG.concurrency) {
			const batch = entries.slice(i, i + CONFIG.concurrency)
			await Promise.all(batch.map((entry) => processImage(entry, set)))
		}
	}

	const duration = ((Date.now() - startTime) / 1000).toFixed(2)
	console.log(`\n✅ Proceso completado en ${duration}s`)
	console.log(`📊 Total de archivos generados: ${processed}`)
}

if (import.meta.main) {
	generate().catch(console.error)
}

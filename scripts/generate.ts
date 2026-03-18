import { basename, dirname, resolve } from 'node:path';
import { readFile, mkdir, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = resolve(__dirname, '..');

const CONFIG = {
	sizes: [16, 32, 64, 128, 256, 512, 1024],
	formats: ['png', 'jpeg', 'webp'] as const,
	inputDir: resolve(ROOT_DIR, 'scripts/input'),
	inputExt: 'webp',
	outputDir: resolve(ROOT_DIR, 'avatars'),
	sets: ['adventure_time'] as const,
	concurrency: 4,
};

let processed = 0;
let total = 0;

async function processImage(entryPath: string, set: string) {
	const base = basename(entryPath, `.${CONFIG.inputExt}`);
	const data = await readFile(entryPath);

	const tasks = CONFIG.sizes.flatMap((size) =>
		CONFIG.formats.map(async (format) => {
			try {
				const outputPath = resolve(
					CONFIG.outputDir,
					set,
					String(size),
					`${base}.${format}`,
				);
				const outputDir = dirname(outputPath);
				await mkdir(outputDir, { recursive: true });

				await sharp(data)
					.resize(size, size)
					.toFormat(format)
					.toFile(outputPath);

				processed++;
				console.log(`[${processed}/${total}] Procesado: ${outputPath}`);
			} catch (error) {
				console.error(`Error procesando ${entryPath}:`, error);
			}
		}),
	);

	for (let i = 0; i < tasks.length; i += CONFIG.concurrency) {
		await Promise.all(tasks.slice(i, i + CONFIG.concurrency));
	}
}

async function generate() {
	console.log('Iniciando generación de imágenes...');
	const startTime = Date.now();

	const { stat } = await import('node:fs/promises');

	try {
		await stat(CONFIG.inputDir);
	} catch (error: any) {
		if (error.code === 'ENOENT') {
			console.error(
				`❌ Error: El directorio de entrada no existe: ${CONFIG.inputDir}`,
			);
			console.log(
				'Por favor, crea el directorio y añade imágenes en:',
				CONFIG.inputDir,
			);
			return;
		}
		throw error;
	}

	for (const set of CONFIG.sets) {
		const setPath = resolve(CONFIG.inputDir, set);
		console.log(`\nProcesando set: ${set} (${setPath})`);

		try {
			await stat(setPath);
		} catch (error: any) {
			if (error.code === 'ENOENT') {
				console.log(`⚠️  No se encontró el directorio del set: ${setPath}`);
				continue;
			}
			throw error;
		}

		const entries = [];
		const files = await readdir(setPath);
		for (const file of files) {
			if (file.endsWith(`.${CONFIG.inputExt}`)) {
				entries.push(resolve(setPath, file));
			}
		}

		if (entries.length === 0) {
			console.log(
				`⚠️  No se encontraron archivos ${CONFIG.inputExt} en: ${setPath}`,
			);
			continue;
		}

		console.log(`🔍 Encontradas ${entries.length} imágenes en ${set}`);
		total += entries.length * CONFIG.sizes.length * CONFIG.formats.length;

		for (let i = 0; i < entries.length; i += CONFIG.concurrency) {
			const batch = entries.slice(i, i + CONFIG.concurrency);
			await Promise.all(batch.map((entry) => processImage(entry, set)));
		}
	}

	const duration = ((Date.now() - startTime) / 1000).toFixed(2);
	console.log(`\n✅ Proceso completado en ${duration}s`);
	console.log(`📊 Total de archivos generados: ${processed}`);
}

// Detect if running directly in Node
import url from 'node:url';
if (import.meta.url === url.pathToFileURL(process.argv[1]).href) {
	generate().catch(console.error);
}

/*
This is the command to generate the types.txt file
for file in /home/micha/devprojects/exavatar/scripts/input/adventure_time/*; do basename "${file%.*}"; done > /home/micha/devprojects/exavatar/scripts/input/types.txt
*/

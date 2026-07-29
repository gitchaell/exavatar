import re

with open('src/pages/playground/index.astro', 'r') as f:
    content = f.read()

# Replace <div class='contents'> with <>
content = content.replace("<div class='contents'>", "<>")
# Replace the corresponding closing </div>. Note: this occurs right before `)}` at the end of builder fields block
content = content.replace("                </div>\n            </div>\n            )}", "                </div>\n            </>\n            )}")

# Fix conditional classes for Id
content = content.replace(
    "class={'grid-box box-height-1 col-[2/12] grid px-2 md:col-[7/10] ' + (avatar.set.value === 'builder' ? 'hidden' : 'row-[14/15] md:row-[6/7]')}",
    "class={`grid-box box-height-1 col-[2/12] px-2 md:col-[7/10] ${avatar.set.value === 'builder' ? 'hidden' : 'grid row-[14/15] md:row-[6/7]'}`}"
)

# Fix conditional classes for Size
content = content.replace(
    "class={'grid-box box-height-1 col-[2/12] grid px-2 md:col-[7/10] ' + (avatar.set.value === 'builder' ? 'row-[14/15] md:row-[6/7]' : 'row-[15/16] md:row-[7/8]')}",
    "class={`grid-box box-height-1 col-[2/12] grid px-2 md:col-[7/10] ${avatar.set.value === 'builder' ? 'row-[14/15] md:row-[6/7]' : 'row-[15/16] md:row-[7/8]'}`}"
)

# Fix conditional classes for Format
content = content.replace(
    "class={'grid-box box-height-1 col-[2/12] grid px-2 md:col-[7/10] ' + (avatar.set.value === 'builder' ? 'row-[15/16] md:row-[7/8]' : 'row-[16/17] md:row-[8/9]')}",
    "class={`grid-box box-height-1 col-[2/12] grid px-2 md:col-[7/10] ${avatar.set.value === 'builder' ? 'row-[15/16] md:row-[7/8]' : 'row-[16/17] md:row-[8/9]'}`}"
)

# Fix conditional classes for Color
content = content.replace(
    "class={'grid-box box-height-1 grid-cross-bl col-[2/12] grid px-2 md:col-[7/10] ' + (avatar.set.value === 'builder' ? 'hidden' : 'row-[18/19] md:row-[10/11]')}",
    "class={`grid-box box-height-1 grid-cross-bl col-[2/12] px-2 md:col-[7/10] ${avatar.set.value === 'builder' ? 'hidden' : 'grid row-[18/19] md:row-[10/11]'}`}"
)

# Fix conditional classes for Buttons
content = content.replace(
    "class={'grid-box box-height-1 col-[2/12] grid grid-cols-2 items-center gap-2 px-2 md:col-[7/10] ' + (avatar.set.value === 'builder' ? 'row-[29/30] md:row-[21/22]' : 'row-[20/21] md:row-[12/13]')}",
    "class={`grid-box box-height-1 col-[2/12] grid grid-cols-2 items-center gap-2 px-2 md:col-[7/10] ${avatar.set.value === 'builder' ? 'row-[29/30] md:row-[21/22]' : 'row-[20/21] md:row-[12/13]'}`}"
)

# Fix conditional classes for AvatarCode
content = content.replace(
    "class={'grid-box box-height-2 col-[1/13] content-center overflow-hidden p-3 text-center md:col-[3/11] ' + (avatar.set.value === 'builder' ? 'row-[30/32] md:row-[22/24]' : 'row-[22/24] md:row-[14/16]')}",
    "class={`grid-box box-height-2 col-[1/13] content-center overflow-hidden p-3 text-center md:col-[3/11] ${avatar.set.value === 'builder' ? 'row-[30/32] md:row-[22/24]' : 'row-[22/24] md:row-[14/16]'}`}"
)

with open('src/pages/playground/index.astro', 'w') as f:
    f.write(content)


with open('src/components/GridPattern.astro', 'r') as f:
    grid_content = f.read()

grid_content = grid_content.replace(
    "document.body.style.gridTemplateRows = `repeat(auto-fill, ${this.config.cellHeight}px)`",
    "document.body.style.gridTemplateRows = `repeat(auto-fill, ${this.config.cellHeight}px)`\n\t\t\t\t\tdocument.body.style.gridAutoRows = `${this.config.cellHeight}px`"
)

with open('src/components/GridPattern.astro', 'w') as f:
    f.write(grid_content)

print("Done")

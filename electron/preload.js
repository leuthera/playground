const fs = require('fs');

global.desktop = {
    files: () => fs.readdirSync(__dirname)
}

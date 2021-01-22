const Jimp = require('jimp');

new Jimp(256, 256, 0xff0000ff, (err, image) => {
  image.write('images/test.png');
});
// class IngameImages extends DrawableObject {

//     img = 'img/gameplay/FullScreen.png';

//     x = 680;
//     y = 430;
//     height = 40;
//     width = 40;

//     constructor() {
//         super().loadImage(this.img);
//     }

//     Fullscreen(canvas) {
//         canvas.addEventListener('click', (event) => {
//             const x = event.offsetX;
//             const y = event.offsetY;

//             if (x >= this.x && x < this.x + this.width && y >= this.y && y < this.y + this.height) {
//                 if (canvas.requestFullscreen) {
//                     canvas.requestFullscreen();
//                 } else if (canvas.mozRequestFullScreen) { /* Firefox */
//                     canvas.mozRequestFullScreen();
//                 } else if (canvas.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
//                     canvas.webkitRequestFullscreen();
//                 } else if (canvas.msRequestFullscreen) { /* IE/Edge */
//                     canvas.msRequestFullscreen();
//                 }
//             }
//         });
//         // Setzt den Mauszeiger auf Pointer, wenn der User über das Bild hovert
//         canvas.addEventListener('mouseover', function (event) {
//             const x = event.offsetX;
//             const y = event.offsetY;
//             if (x >= self.x && x < self.x + self.width && y >= self.y && y < self.y + self.height) {
//                 canvas.style.cursor = 'pointer';
//             }
//         });

//         // Setzt den Mauszeiger zurück, wenn er das Bild verlässt
//         canvas.addEventListener('mouseout', function (event) {
//             canvas.style.cursor = 'default';
//         });
//     }
// }
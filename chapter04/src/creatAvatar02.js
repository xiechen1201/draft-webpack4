import test02Img from './test02.jpeg';
import style from './index.scss';

export default function createAvatar() {
    let img2 = new Image();
    img2.src = test02Img;
    img2.classList.add(style.avatar);
    document.getElementById("app").appendChild(img2);
}
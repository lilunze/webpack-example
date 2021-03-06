/*
 * @Author: lilunze
 * @LastEditors: lilunze
 */
import _ from "lodash";
import "./style.css";
import Icon from "./assets/images/icon.png";
import Data from './data.xml'
import Text from './test.txt'
import config from '../public/config'

function component() {
  console.log(config)
  var element = document.createElement("div");

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(["Hello", "webpack", "哈哈"], " ");
  element.classList.add("hello");
  var myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon);
  return element;
}

document.body.appendChild(component());

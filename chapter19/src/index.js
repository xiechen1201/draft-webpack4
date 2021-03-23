import _ from "lodash";
import $ from "jquery";
import {
    ui
} from './jquery.ui'

ui();
const dom = $("<div>");
dom.html(_.join(["dell", "less", "Hello Word"], "~"));
$("body").append(dom)
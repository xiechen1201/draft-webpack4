import _ from "lodash";
import $ from "jquery";

const dom = $("<div>");
dom.html(_.join(["dell", "less","Hello Word"], "~"));
$("body").append(dom)
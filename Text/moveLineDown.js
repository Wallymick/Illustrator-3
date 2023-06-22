/* ===============================================================================================================================================
   moveLineDown

   Description
   This script is equivalent to Visual Studio Code's Selection menu "Move Line Down".
   Both point and area types are supported.

   Usage
   Move the cursor to the line you want to move, run this script from File > Scripts > Other Script...
   It is not necessary to select a line.

   Notes
   Since copy and paste inside the script, if you have copied the content in advance, it will be lost.
   Only one line can be moved. Multiple lines are not supported.
   Area type with wrapping may not work well.
   If you are using version 2020 or earlier, you will not be able to enter keyboard input after running the script.
   If you want to enter text, you must click with the mouse.
   In rare cases, you may not be able to create it.
   In that case, restart Illustrator and run this script again.

   Requirements
   Illustrator CC 2018 or higher

   Version
   1.0.1

   Homepage
   github.com/sky-chaser-high/adobe-illustrator-scripts

   License
   Released under the MIT license.
   https://opensource.org/licenses/mit-license.php
   =============================================================================================================================================== */

(function() {
    if (app.documents.length > 0) main();
})();


function main() {
    try {
        var text = app.activeDocument.selection;
        var ranges = text.story.textRanges;
        var lines = text.story.lines;
        var cursor = text.start;

        var index = getLine(lines, cursor);
        if (index == lines.length - 1) return;

        var contents = moveLineDown(lines, index);
        restoreCursorPosition(ranges, cursor + contents);
    }
    catch (err) { }
}


function moveLineDown(lines, index) {
    lines[index].select();
    app.cut();
    lines[index + 1].duplicate(lines[index]);

    var contents = lines[index].contents.length;

    lines[index + 1].select();
    app.paste();

    return contents;
}


function getLine(lines, cursor) {
    for (var i = 0; i < lines.length; i++) {
        var end = lines[i].end;
        if (cursor <= end) return i;
    }
    return lines.length - 1;
}


function restoreCursorPosition(ranges, cursor) {
    ranges[cursor].select();
    app.cut();
    app.paste();
}

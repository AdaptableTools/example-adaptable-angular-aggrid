"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
A collection of Shortcuts.

An IShortcut consists of 5 properties:

ShortcutKey: The keyboard key which will trigger the function.

ShortcutResult: The output of the function.

ShortcutOperation: What the function does.

Possible values are: Add, Subtract, Multiply, Divide or Replace.

Column Type: Data type of the column where shortcut can be applied.

Possible values are: Number, Date.

IsDynamic: Whether the Shortcut uses a System Filter (e.g. 'Next Working Day' Date System Filter).
*/

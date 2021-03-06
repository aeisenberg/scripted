/*******************************************************************************
 * @license
 * Copyright (c) 2013 VMware and contributors.
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html).
 *
 * Contributors:
 *		Andy Clement
 *******************************************************************************/
 
/*
 * Keeps track of the current theme, supports the simple toggle button that switches light/dark
 * and can apply the current theme to new editors.
*/
define(["scripted/utils/editorUtils","scripted/utils/storage","jquery"],function(editorUtils, storage) {
 
	var themePreferenceKey = 'scripted.preference.theme';
	var currentTheme=""; // default is 'none'

	var getTheme = function() {
		return currentTheme;
	};

	var switchTheme = function() {
		var textview = editorUtils.getMainEditor().getTextView();
		if (!currentTheme || currentTheme.length===0) {
			$('#side_panel').addClass("dark");
			currentTheme="dark";
		} else {
			$('#side_panel').removeClass("dark");
			currentTheme="";
		}
		storage.safeStore(themePreferenceKey, currentTheme, false);
		textview._setThemeClass(currentTheme,true);
		var otherEditors = editorUtils.getSubEditors();
		if (otherEditors) {
			for (var e = 0; e<otherEditors.length; e++) {
				otherEditors[e].getTextView()._setThemeClass(currentTheme,true);
			}
		}
	};
	
	var applyCurrentTheme = function(editor) {
		if (currentTheme==='dark') {
			$('#side_panel').addClass("dark");
		} else {
			$('#side_panel').removeClass("dark");
		}
		editor.getTextView()._setThemeClass(currentTheme,true);
	};
	
	var preference = storage.get(themePreferenceKey);
	if (preference && preference.length!==0) {
		currentTheme = preference;
	}
				
	$('#theme_toggle').on('click', switchTheme);
				
	return {
		switchTheme: switchTheme,
		getTheme: getTheme,
		applyCurrentTheme: applyCurrentTheme
	};
 
 });
<img src="https://i.ibb.co/vx5CZrd/icon48.png"></img>
<img src="https://i.ibb.co/2Pfgx16/Play-Pause-Button.png"></img>
# Power BI Real-Time Slideshow

| Release Date | Released By | Tags |
| --- | --- | --- |
| 2019-01-02 | DMiradakis | Power BI, Power BI Real-Time Slideshow |

## About The Extension
This is an open source Google Chrome extension for displaying Power BI Reports in a Slideshow fashion utilizing dynamic data from the data source(s).

A problem that Power BI users face is displaying Direct Query reports that are **not** updating the visuals on the report tabs: the data will update *in the background*, **but the associated visuals will not update**. Additionally, Power BI users need the visuals to *update programatically*, **without the need of user interaction or input**.

With this extension, **your visuals will now update WITH your data** in near Real-Time (according to what refresh time and slide time you choose), and you will not be constrained to the Power BI Service's minumum visual refresh parameters. 

Contrary to the original version of the extension, this version is a fully functional <u>popup menu</u>. Many Power BI users on the Power BI community have also requested that a **Play/Pause button** be added to the extension to start and stop the extension on demand. That functionality has been successfully implemented, and users also have the ability to choose their own Refresh Time and Slide Time from respective drop down boxes.

Many thanks to user @PicolotoLF. This extension is a near-complete overhaul of his original extension.

## Installing The Extension
1. Click the ellipsis (3-dot icon) in Google Chrome, hover your cursor over "More Tools", and click "Extensions".
2. Toggle "Developer mode" to the on position if it is not already.
3. Download this repository on your machine. *Ensure that you are downloading from the **Master Branch** of the repository.*
4. Click "Load Unpacked" in Google Chrome, and navigate to the folder on your machine containing this repository.

## Operating the Extension
Upon loading the extension to Google Chrome, you will now see a small yellow Power BI icon in the Chrome toolbar. This extension has been restricted to only operate on URLs linked to Power BI Reports, so the popup will be disabled on all other web pages to prohibit unwanted operation.

<img src="img/Documentation - Icon.png"></img>

Navigate to a Power BI Report URL, and then click the extension's icon on the toolbar. You should see a popup menu appear with several elements:
* Refresh Time drop down menu and corresponding save button
* Slide Time drop down menu and corresponding save button
* Play and Stop buttons

<img src="img/Documentation - Popup.png"></img>

The popup will be initialized with default values for the Refresh Time and Slide Time, but if you would like to change those values, simply utilize the drop down menus and click the save buttons, respectively.

Once you are satisfied with the Refresh Time and Slide Time values, click the large, green Play button to initialize the extension. To stop or pause the extension, click the large, red Stop button.

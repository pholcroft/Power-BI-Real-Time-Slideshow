# Power BI Real-Time Slideshow

This is an updated version of an open-source Google Chrome extension for displaying Power BI Reports in a slideshow mode on Google Chrome. I have modified the original code to programatically refresh the report upon the cyclying of each page. This guarantees that, upon each page cycle, the Report's consumers are looking at the freshest data. 

<p>This is a problem many Power BI report creators have run into (myself included) when utilizing Direct Query mode in a Power BI Report: the data will refresh in the background, but the associated report visuals will not refresh as frequently as the data does in the background. 

<p>With this extension, your visuals will now update WITH your data in near Real-Time (according to what refresh/slide time you choose), and you will not be constrained to the Power BI Service's minumum parameters.

<p> Many thanks to user @PicolotoLF.

## Install The Extension
1. Click the 3-dot icon in Google Chrome, hover your cursor over "More Tools", and click "Extensions".
2. Toggle "Developer mode" to the on position if it is not already.
3. Download this repository on your machine.
3. Click "Load Unpacked" in Google Chrome, and navigate to the folder on your machine containing this repository.

## Working

### Initializing The Extension
Upon adding the extension to Google Chrome, you should now see a small Power BI icon on the toolbar. To initialize the Real-Time Slideshow mode, do the following:
1. Navigate to the Power BI Service, and select a Workspace.
2. Navigate to the Workspace's Reports Page, and select a Report.
3. After opening the report, click the extension's icon to initialize Real-Time Slideshow mode.

### Changing The Refresh/Slide Time
To change the Refresh/Slide Time Interval, right-click this extension's Power BI icon to navigate to the Options page. There, you may change the interval.

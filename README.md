REST API testing extension
======================
This extension is a helper tool for generating REST API test files compatible with the [REST API Testing framework](https://github.com/srinivas2207/RestApiTest).



Installation
------------
1.	Download the project and keep it in some location. (UnZip if downloaded as ZIP)
2.	Go to chrome extensions page (**chrome://extensions/**)
3.	Enable **developer mode**.
4.	Click on **Load Unpacked Extension** and select the extracted folder.
5.	If there’s no error it will show the extension on chrome’s top right corner (Icon with letter **R**) 


Usage
-----

1.	Open the web application and run the extension.
2.	It will open a small window in bottom right corner of the web page.
  ![Alt text](/docs/usage1.png?raw=true)
3.	Expand the window and click on start to monitor API calls.
4.	Based on User action, all the **AJAX** or **network calls** will be listed out.
(**FileUpoad** and **FileDownload** related API calls will not be listed, these need to be handled manually from developer console)
![Alt text](/docs/usage2.png?raw=true)
5.	Select the **API call** to Read, Edit, Delete or Filter.
6.	Use **COPY** to get the API request info in test format.
7.	Add the API Calls to recorder by providing comments.
8.	Click on **Download** button to get the property file containing all the monitored API calls.
9.	This file will be in exact test format required by [REST API Testing framework](https://github.com/srinivas2207/RestApiTest)

Settings
--------

**1.API Filters**

Applications uses REST APIs for different purpose. These are used based on the UI design and the functionality. Some of these calls may not be required to test.

To handle these unnecessary calls API filter settings can be used.
1.	Open settings panel by clicking on **settings** icon.
2.	Add new filter by providing **Http Method** and **Rest Path**.
3.	Check/Uncheck the API to filter.
4.	Save the changes. 
5.	Use Export/Import to share the filter content with others.

![Alt text](/docs/filter.png?raw=true)

**2.Swagger Data**

Swagger is a tool, which generates API document from the application’s rest code. The Swagger.json is standard for REST applications.

![Alt text](/docs/swagger.png?raw=true)

Here **paths** contains all the REST URL’s and their details. Upload this **swagger.json** to the extension, as it helps the extension to identify the URL and makes the recordings more readable.





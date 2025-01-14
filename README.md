# Web Application Mimicking Google Sheets

## Project Description

Develop a web application that closely mimics the user interface and core functionalities 
of Google Sheets, with a focus on mathematical and data quality functions, data entry, 
and key UI interactions.

### Installation and Setup Instruction

#### 1.Clone the Repository:

~~~
git clone https://github.com/Gopi1311/google-Spreadsheet.git
~~~

~~~
cd chatbot
~~~

#### 2.Install Dependencies: 
  Ensure you have Node.js and npm installed. Then, run the following command to install the required packages:
~~~
npm install
~~~
#### 3.Run the Development Server: 
  Start the application using react:
~~~
npm start
~~~
#### 4.Build for Production:
To build the application for production, use:
~~~
npm run build
~~~

### How toRun the Application

1.Use the setup instructions provided earlier to install dependencies and initialize the project.

2. Start the development server by running: npm start
   
3. Open your browser and navigate to the address provided by the server, typically:
~~~
http://localhost:3000
~~~

### Features
#### 1. Spreadsheet Interface
##### Google Sheets-Like UI:
Mimics the design and layout of Google Sheets, including toolbar, formula bar, and grid structure.
    
##### Drag Functions:
Implement drag-and-drop functionality for cell content, formulas, and selections to mirror Google Sheets.
    
##### Cell Dependencies:
Updates formulas and values dynamically based on changes in related cells.
    
##### Basic Cell Formatting:
Support for bold, italics, font size adjustments, and cell coloring.
    
##### Row and Column Management:
Ability to add, delete, and resize rows and columns.
#### 2. Mathematical Functions
The application includes the following core mathematical functions:

##### SUM: 
Calculates the sum of a range of cells.
##### AVERAGE: 
Calculates the average value of a range of cells.
##### MAX:
Returns the maximum value from a range of cells.
##### MIN: 
Returns the minimum value from a range of cells.
##### COUNT: 
Counts the number of numeric entries in a range of cells.

#### 3. Data Quality Functions
  The following data quality functions are implemented:
##### TRIM: 
Removes leading and trailing whitespace from a cell.
##### UPPER: 
Converts the text in a cell to uppercase.
##### LOWER: 
Converts the text in a cell to lowercase.
##### REMOVE_DUPLICATES: 
Eliminates duplicate rows from a selected range.
##### FIND_AND_REPLACE: 
Finds and replaces specified text in a selected range of cells.

#### 4. Data Entry and Validation
##### Data Types:
Supports input of numbers, text, and dates.
##### Validation:
Implements basic checks to ensure numeric cells only contain numbers.

#### 5. Testing and Results Display
Provides an interactive interface for users to test the functions with their own data.
Displays the results of function executions clearly in the spreadsheet.

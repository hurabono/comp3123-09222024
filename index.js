var http = require("http");

//TODO - Use Employee Module here
const employees = require('./Employee');
console.log("Lab 03 -  NodeJs");

//TODO - Fix any errors you found working with lab exercise
//  I do not know why, I faced res.end() being called multiple times, code: 'ERR_STREAM_WRITE_AFTER_END'


//Server Port
const port = process.env.PORT || 8081



//Create Web Server using CORE API
const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'text/html');

    if (req.method !== 'GET') {
        
            res.end(`{"error": "${http.STATUS_CODES[405]}"}`)

        }

        // load json employee data
        
        if (req.url === '/') {
            //TODO - Display message "<h1>Welcome to Lab Exercise 03</h1>"
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>Welcome to Lab Exercise 03</h1>');
        }

        else if (req.url === '/employee') {
            //TODO - Display all details for employees in JSON format
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(employees));
        }

        else if (req.url === '/employee/names') {
            //TODO - Display only all employees {first name + lastname} in Ascending order in JSON Array
            //e.g. [ "Ash Lee", "Mac Mohan", "Pritesh Patel"]

            const names = employees.map(emp => `${emp.firstName} ${emp.lastName}`).sort();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(names));

        }

        else if (req.url === '/employee/totalsalary') {
            //TODO - Display Sum of all employees salary in given JSON format 
            //e.g. { "total_salary" : 100 }  
            const totalSalary = employees.reduce((sum, emp) => sum + emp.Salary, 0);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ total_salary: totalSalary }));

    } else {
        res.end(`{"error": "${http.STATUS_CODES[404]}"}`) 
    }
     
    
})

server.listen(port, () => {
    console.log('Server running at http://127.0.0.1:8081/');
})
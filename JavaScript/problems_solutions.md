This markdown file is meant for all problems encountered during the learning journey and all the solutions

01
- Error:
error: src refspec main does not match any
error: failed to push some refs to 'https://github.com/nnatebach/Bachs_dev_PET.git'
- Reason: You need to commit a file before pushing
- Solution: git push

02
- Error
statement = "Arrays are like objects"
- Reason: Uncaught SyntaxError: Invalid shorthand property initializer
- Solution: statement: "Arrays are like objects"

03
- Error
const fact = {
  statement: "Arrays are like objects";
  answer: true;
}
- Reason: Uncaught SyntaxError: Unexpected token ';'
- Solution:
const fact = {
  statement: "Arrays are like objects",
  answer: true,
}

04
- Error:
const statement = document.getElementById("statement")
statement = fact.statement;
- Reason: Uncaught TypeError: Assignment to constant variable.
- Solution:

05
- Problem: Browser fails to read HTML DOM
- Reason: script tag in HTML head
- Solution: Move script tag down just above the closing body tag </body>

06
- Problem: Uncaught TypeError: Cannot read properties of undefined (reading '......')
- Reason: JavaScript cannot find the DOM element
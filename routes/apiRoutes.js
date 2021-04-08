const noteInfo = require("../db/db.json");
const fileName = './db/db.json';
const fs = require("fs");

function baby1ID(){
  let numbers = ["1234567890"];
  let symbols = ["!@#$%^&*()"];
  let letters = ["QWERTYUIOPASDFGHJKLZXCVBNM"];
  let smlLetters = ["qwertyuiopasdfghjklzxcvbnm"];
  let choice = [numbers, symbols, letters, smlLetters];
  let ID = "";

  for(i=0; i<10; i++){
    let randomChoice = Math.floor(Math.random()*3);
    let randomNumber = Math.floor(Math.random()*9);
    let randomSymbol = Math.floor(Math.random()*9);
    let randomLetters = Math.floor(Math.random()*25);
    let randomsmlLetters = Math.floor(Math.random()*25);
    let mychoice = choice[randomChoice];

    if (mychoice === choice[0]){
      let unit = mychoice[0][randomNumber]
      ID += unit
    }else if (mychoice === choice[1]){
      let unit = mychoice[0][randomSymbol]
      ID += unit
    }
    else if (mychoice === choice[2]){
      let unit = mychoice[0][randomLetters]
      ID += unit
    }else{
      let unit = mychoice[0][randomsmlLetters]
      ID += unit
    }
  }
  return ID; 
};

module.exports = function(app){
  // make a get request
  // making api
  app.get("/api/notes", function(req,res){
    //fs is a file reading system and reads in the notes (can read and write)
    let noteData = fs.readFileSync(fileName, "utf-8");
    console.log(noteData);
    //parse is the opposite of stringify (turning back from string into object)
    res.json(JSON.parse(noteData));
  });
  //make a post request
  app.post("/api/notes", function(req,res){
    let parseData = JSON.parse(fs.readFileSync(fileName));
     //req is what the user modified on front end
    let newNote = {
    "title":req.body.title,
    "text":req.body.text,
    "id":baby1ID()
    };

    parseData.push(newNote);
    console.log(newNote);

    fs.writeFileSync(fileName, JSON.stringify(parseData));
    //view new note on front end by rendering it with res
    res.json(newNote);
  });
  //make a delete request

  app.delete("/api/notes/:id", function(req,res){
    let id = req.params.id;
    const byeData = JSON.parse(fs.readFileSync(fileName));

    const newData = byeData.filter((note) => note.id !== id);
    fs.writeFileSync(fileName, JSON.stringify(newData));
    res.json({ok:true});
  });
}
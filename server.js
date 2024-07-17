/********************************************************************************
 *  WEB322 – Assignment 04
 *
 *  I declare that this assignment is my own work in accordance with Seneca's
 *  Academic Integrity Policy:
 *
 *  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
 *
 *  Name: _______Tijani Ayomide Philip Student ID: ______153732227 Date: ___16 July 2024
 * 
 * Published URL: tugas4-4j5g266xf-yongkys-projects.vercel.app
 * 
 ********************************************************************************/

const express = require('express');
const legoData = require("./modules/legoSets");
const path = require('path');
const app = express();
const HTTP_PORT = process.env.HTTP_PORT || 8080;

app.set('view engine', 'ejs');
//app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');

legoData.initialize()
  .then(() => {
    app.get('/', (req, res) => {
      res.render('home');
    });

    app.get('/about', (req, res) => {
      res.render('about');
    });

    app.get('/lego/sets', (req, res) => {
      const theme = req.query.theme;
      if (theme) {
        legoData.getSetsByTheme(theme)
          .then(sets => res.render('sets', { sets, page: '/lego/sets' }))
          .catch(err => res.status(404).render('404', { message: err }));
      } else {
        legoData.getAllSets()
          .then(sets => res.render('sets', { sets, page: '/lego/sets' }))
          .catch(err => res.status(500).render('404', { message: err }));
      }
    });

    app.get('/lego/sets/:setNum', (req, res) => {
      legoData.getSetByNum(req.params.setNum)
        .then(set => res.render('set', { set }))
        .catch(err => res.status(404).render('404', { message: err }));
    });

    app.use((req, res) => {
      res.status(404).render('404', { message: "I'm sorry we're unable to find what you're looking for" });
    });

    app.listen(HTTP_PORT, () => {
      console.log(`Server is running on port ${HTTP_PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to initialize lego data:', err);
  });
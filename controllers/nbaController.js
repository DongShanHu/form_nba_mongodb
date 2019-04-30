const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const nba = mongoose.model('nba');

router.get('/', (req, res) => {
    //設定路由位置
    res.render("nba/addOrEdit", {
        viewTitle: "Insert ITEM"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {

    //這裡有錯 nba is not a constructor
    var NBA = new nba();
    NBA.Create_time = req.body.Create_time;
    NBA.HomeName = req.body.HomeName;
    NBA.AwayName = req.body.AwayName;
    NBA.B2B = req.body.B2B;
    NBA.Item = req.body.Item;
    NBA.compansate = req.body.compansate;
    NBA.AwayScore = req.body.AwayScore;
    NBA.HomeScore = req.body.HomeScore;
    NBA.Pass = req.body.Pass;
    NBA.HalfAwayScore = req.body.HalfAwayScore;
    NBA.HalfHomeScore = req.body.HalfHomeScore;
    NBA.HalfScore = req.body.HalfScore;
    NBA.Comment = req.body.Comment;
    NBA.save((err, doc) => {
        if (!err)
            res.redirect('nba/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                // 修改項目
                res.render("nba/addOrEdit", {
                    viewTitle: "Insert ITEM",
                    NBA: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    NBA.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('nba/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("nba/addOrEdit", {
                    viewTitle: 'Update nba',
                    NBA: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    NBA.find((err, docs) => {
        if (!err) {
            res.render("nba/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving nba list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    NBA.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("nba/addOrEdit", {
                viewTitle: "Update nba",
                NBA: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    NBA.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/nba/list');
        }
        else { console.log('Error in nba delete :' + err); }
    });
});

module.exports = router;
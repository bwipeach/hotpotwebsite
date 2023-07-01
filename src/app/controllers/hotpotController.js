const Hotpot = require('../models/Hotpot');
const User = require('../models/User')
const { mongooseToObject } = require('../../util/mongoose');
const { Promise } = require('mongoose');
class hotpotController {
    //[GET] /hotpots/:slug
    show(req, res, next) {
        Promise.all([
            Hotpot.findOne({ slug: req.params.slug }),
            User.findById(req.user._id)
        ])
            .then(([hotpot, user]) => {
                res.render('hotpot/show', {
                    hotpot: mongooseToObject(hotpot),
                    user: mongooseToObject(user)
                });
            })
            .catch(next);
    }
    //[GET] /hotpots/create
    create(req, res, next) {
        User.findById(req.user._id)
        .then((user) => {
            res.render('hotpot/create',{
                user: mongooseToObject(user)
            });
        })
        .catch(next);   
    }
    //[POST] /hotpots/store
    store(req, res, next) {
        const hotpot = new Hotpot(req.body);
        hotpot.save().then(() => res.redirect('/warehouse/stored/hotpots'));
    }

    //[GET] /hotpots/:id/edit
    edit(req, res, next) {
        Promise.all([
            Hotpot.findById(req.params.id),
            User.findById(req.user._id)
        ])
            .then(([hotpot, user]) => {
                res.render('hotpot/edit', {
                    hotpot: mongooseToObject(hotpot),
                    user: mongooseToObject(user)
                });
            })
            .catch(next);
    }
    //[PUT] /hotpots/:id
    update(req, res, next) {
        Hotpot.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/warehouse/stored/hotpots'))
            .catch(next);
    }

    //[DELETE] /hotpots/:id
    delete(req, res, next) {
        Hotpot.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[DELETE] /hotpots/:id/force
    forceDelete(req, res, next) {
        Hotpot.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[PATCH] /hotpots/:id/restore
    restore(req, res, next) {
        Hotpot.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[POST] /hotpots/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Hotpot.delete({ _id: { $in: req.body.hotpotIds } }) //handle array
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Invalid' });
        }
    }
    //[POST] /hotpots/handle-form-actions
    handleTrashActions(req, res, next) {
        switch (req.body.action) {
            case 'restore':
                Hotpot.restore({ _id: { $in: req.body.hotpotIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'delete':
                Hotpot.deleteMany({ _id: { $in: req.body.hotpotIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Invalid' });
        }
    }
}
module.exports = new hotpotController();

const Hotpot = require('../models/Hotpot');
const { mongooseToObject } = require('../../util/mongoose');
class hotpotController {
    //[GET] /hotpots/:slug
    show(req, res, next) {
        Hotpot.findOne({ slug: req.params.slug })
            .then((hotpot) => {
                res.render('hotpot/show', {
                    hotpot: mongooseToObject(hotpot)
                });
            })
            .catch(next);
    }
    //[GET] /hotpots/create
    create(req, res, next) {
        res.render('hotpot/create');
    }
    //[POST] /hotpots/store
    store(req, res, next) {
        const hotpot = new Hotpot(req.body);
        hotpot.save().then(() => res.redirect('/warehouse/stored/hotpots'));
    }

    //[GET] /hotpots/:id/edit
    edit(req, res, next) {
        Hotpot.findById(req.params.id)
            .then((hotpot) => {
                res.render('hotpot/edit', {
                    hotpot: mongooseToObject(hotpot)
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

var Campground = require("../models/campground");
var Comment = require("../models/comment");
var User = require("../models/user");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
           if(err || !foundCampground){
               req.flash("error", "Campground not found");
               res.redirect("back");
           }  else {
               // does user own the campground?
            if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin) {
                next();
            } else {
                res.redirect("back");
            }
           }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err || !foundComment){
               req.flash("error", "Comment not found");
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
                next();
            } else {
                req.flash("error", "You don´t have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

middlewareObj.isNotVerified = async function(req, res, next) {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user.isVerified) {
            console.log("try: ");
            return next();
        }
        req.flash('error', 'Your account has not been verified. Please check your email to verify your account');
        return res.redirect('/campgrounds');
    } catch (error) {
        console.log(error);
        req.flash('error', 'Something went wrong. We could not verify you. Please contact us for assistance.');
        res.redirect('/campgrounds');
    }
}

module.exports = middlewareObj;
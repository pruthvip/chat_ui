const path = require('path');
const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.static('public')); /* this line tells Express to use the public folder as our static folder from which we can serve static files*/


// send the static file if requested
// otherwise send the index.html
app.get('/*', function (req, res) {
    if (fs.existsSync(`./public/${req.url}`, { root: __dirname })) {
        res.sendFile(`./public/${req.url}`, { root: __dirname })
        return;
    }

    res.sendFile('/public/index.html', { root: __dirname })
})



app.listen(3000, function () {
    console.log("Listening on port 3000!")
});

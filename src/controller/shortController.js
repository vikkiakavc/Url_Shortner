const db = require('../db/index');
const shortid = require('shortid');
const Shorts = db.shorts;


const addUrl = async (req, res) => {
    const {url , code} = req.body;
    try{
        const [data, created] = await Shorts.findOrCreate({
            where : { url : url},
            defaults : {
                url : url,
                code : code ? code : shortid.generate()
            }
        })
        const response = {
            data: data,
            add: created
        }
        res.status(200).json(response);
    }catch(err) {
        console.log('Error: ', err);
        res.status(500).json({ error: 'Internal server error!'})
    }
    
}

const findUrl = async (req, res) => {
    try{
        const data = await Shorts.findOne({
            where : {
                code: req.params.code
            }
        });
        console.log(data)
        if (!data){
            return res.status(400).json({
                error: "Url not found!"
            })
        }
        data.clicks += 1;
        await data.save();

        res.redirect(data.url)
    }catch(err) {
        console.log('Error: ', err);
        res.status(500).json({ error: 'Internal server error!'})
    }
    
}

const findAll = async (req, res) => {
    const data = await Shorts.findAll({});

    res.status(200).json({
        data: data
    });
}

const deleteUrl = async (req, res) => {
    try{
        const data = await Shorts.destroy({
            where : {
                code: req.params.code
            }
        })

        if (data === 0){
            return res.status(404).json ({ error : 'Url not found!'});
        }
        res.json({message : 'Url deleted successfully'})
    }catch (error) {
        console.log('Error: ', err);
        res.status(500).json({ error: 'Internal server error!'})
    }
}

module.exports = {
    addUrl,
    findUrl,
    findAll, 
    deleteUrl
}
const express = require('express')
const { pool } = require('../config/database.js')

const getPosts = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM blogposts ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(400).json( { error: error.message } )
    }
}

const getPostsById = async (req, res) => {
    try {
        const postId = req.params.id
        const results = await pool.query('SELECT * FROM blogposts WHERE id = $1', [postId])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(400).json( { error: error.message } )
    }
}

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const results = await pool.query('INSERT INTO blogposts (title, content) VALUES ($1, $2) RETURNING *', [title, content])
        res.status(201).json(results.rows[0])
    } catch (error) {
        res.status(400).json( { error: error.message } )
    }
}

const updatePost = async (req, res) => {
    try {
        const postId = parseInt(req.params.id)
        const { title, content } = req.body
        const results = await pool.query('UPDATE blogposts SET title = $1, content = $2 WHERE id = $3', [title, content, postId])
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(400).json( { error: error.message } )
    }
}

const deletePost = async (req, res) => {
    const postId = parseInt(req.params.id)
    
    try {
        const results = await pool.query('DELETE FROM blogposts WHERE id = $1', [postId])
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(400).json( { error: error.message } )
    }
}

module.exports = {
    getPosts,
    getPostsById,
    createPost,
    updatePost,
    deletePost
}
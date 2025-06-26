/*
    LIBRARY YANG DIGUNAKAN
    - express: untuk membuat server dan mengatur routing
    - path: untuk mengelola path file
*/
const express = require('express') //Express
const path = require('path')


/*
    MENYEDIAKAN FILE STATIS
    contoh : css, js,gambar, dll pada folder src
*/
app.use('/',express.static(path.join(__dirname, 'src')))


/*
    ENDPOINT UNTUK PAGE
*/
// 1. index atau halaman utama
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'page', 'index.html'))
})


/* 
    ENDPOINT UNTUK API
    endpoint harus diawali dengan /api
    contoh: /api/rokok
*/
// 1. API untuk data jumlah perokok di indonesia
app.get('/api/perokok', (req, res) => {
    res.json({
        jumlah: 60000000, // Isi dengan jumlah perokok di Indonesia
        tahun: 2023 // Isi dengan tahun data tersebut
    })
})

/*
    KONFIGURASI SERVER
    - Gunakan port yang telah ditentukan
    - Gunakan express.static untuk menyajikan file statis
*/
//Memulai Server
app.listen(port,()=>{
    console.log(`server start in http://localhost:${port}`)
})
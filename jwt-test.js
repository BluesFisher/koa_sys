const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const { sign } = require('jsonwebtoken')
const secret = 'demo'
const jwt = require('koa-jwt')({ secret })
const app = new Koa()

app.use(bodyParser())

const admin = async (ctx, next) => {
    if (ctx.state.user.username === 'admin') {
        next()
    } else {
        ctx.body = {
            code: -1,
            message: 'Authentication Error'
        }
    }
}

router
    .post('/api/login', async (ctx, next) => {
        const user = ctx.request.body
        console.log(user)
        if (user && user.username) {
            let { username } = user
            const token = sign({ username }, secret, { expiresIn: '1h' })
            ctx.body = {
                message: 'Get Token Success',
                code: 1,
                token
            }
        } else {
            ctx.body = {
                message: 'Param Error',
                code: -1
            }
        }
    })
    .get('/api/userInfo', jwt, async ctx => {
        ctx.body = { username: ctx.state.user.username }
    })
    .get('/api/adminInfo', jwt, admin, async ctx => {
        ctx.body = { username: ctx.state.user.username }
    })

// const user = new router()
// const detail = new router()

// detail.get('/info', async ctx => {
//     ctx.body = { username: ctx.state.user.username }
// })

// user.get('/api/login', async (ctx, next) => {
//     const user = ctx.request.body
//     if (user && user.username) {
//         let { username } = user
//         const token = sign({ username }, secret, { expiresIn: '1h' })
//         ctx.body = {
//             message: 'Get Token Success',
//             code: 1,
//             token
//         }
//     } else {
//         ctx.body = {
//             message: 'Param Error',
//             code: -1
//         }
//     }
// }).use('/api/user', jwt, detail.routes(), detail.allowedMethods())

// app.use(router.routes()).use(router.allowedMethods())

// add router middleware:
app.use(router.routes())

app.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
})

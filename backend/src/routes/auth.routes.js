import { Router } from "express";

const router = Router();

router.get('/test', (req, res) => {
    res.json({ message: 'Hello from auth' })
})

export default router
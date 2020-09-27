import {Router} from 'express';
const router = Router();

import {getAccounts, addAccount, sendMail} from '../controllers/index.controllers';

router.get('/accounts', getAccounts);
router.post('/accounts', addAccount);
router.post('/mail', sendMail);

export default router;
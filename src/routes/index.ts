import {Router} from 'express';
const router = Router();

import {getAccounts, addAccount} from '../controllers/index.controllers';

router.get('/accounts', getAccounts);
router.post('/accounts', addAccount);

export default router;
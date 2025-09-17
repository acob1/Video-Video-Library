import { Routes } from '@angular/router';
import { PlayerScreen } from '../Components/player-screen/player-screen';
import { ListviderScreen } from '../Components/listvider-screen/listvider-screen';

export const routes: Routes = [
    {
        path: '',
        component: ListviderScreen
    },
    {
        path: 'videos/:id',
        component: PlayerScreen
    },

];

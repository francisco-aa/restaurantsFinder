import { Routes, RouterModule } from '@angular/router';

// Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const CONTENT_ROUTES: Routes = [
     {
        path: 'pages',
        loadChildren: () => import('../../pages/auth/authentication.module').then(m => m.AuthenticationModule)
    }
];

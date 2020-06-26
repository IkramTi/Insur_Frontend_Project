// @material-ui/icons

// core components/views for Admin layout

import PaysPage from 'views/Referentiel/Pays';
import ProductType from 'views/Auto/ProductType';
import Simulator from 'views/Auto/Simulator';

const dashboardRoutes = [
	{
		path: '/utilisateurs',
		//component: TestPage,
		layout: '/admin',
	},
	{
		path: '/role',
		//component: TestPage,
		layout: '/admin',
	},
	{
		path: '/Langue',
		//component: PaysPage,
		layout: '/admin',
	},
	{
		path: '/Pays',
		component: PaysPage,
		layout: '/admin',
	},
	{
		path: '/maladie',
		//component: TestPage,
		layout: '/admin',
	},
	{
		path: '/Simulation',
		component: Simulator,
		layout: '/admin',
	},
];

export default dashboardRoutes;

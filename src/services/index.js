import AuthenticationService from './Authentication.service';
import VilleService from './Ville.service';
import BaseService from './Base.service';
import ReferentielService from './Referentiel.service';
import PackService from './Pack.service';
import PeriodService from './Period.service';
import CoverService from './Cover.service';

const services = {
	AuthenticationService: new AuthenticationService('Authentication'),
	PaysService: new BaseService('/Rest/Pays'),
	VilleService: new VilleService('/Rest/Ville'),
	LangueService: new BaseService('/Rest/Lang'),
	ReferentielService: new ReferentielService('/Rest/Referentiel'),
	ProductService: new BaseService('/Rest/Product'),
	PackService: new PackService('/Rest/Pack'),
	PeriodService: new PeriodService('/Rest/Period'),
	CoverService: new CoverService('/Rest/Cover'),
};

export default services;

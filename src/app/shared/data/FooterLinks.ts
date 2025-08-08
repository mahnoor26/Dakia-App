import insta from '../../assets/Footer/instagram.png';
import linkedin from '../../assets/Footer/linkedin.png';
import dribble from '../../assets/Footer/dribble.png';
import { FooterLink, SocialImage } from './types';

export const links: FooterLink[] = [{ name: 'Help Center' }, { name: 'RoadMap' }, { name: 'FB Group' }, { name: 'Terms' }, { name: 'Privacy' }, { name: 'Terms' }, { name: 'DPA' }];

export const socialImages: SocialImage[] = [
    { icon: dribble, label: 'Dribble' },
    { icon: insta, label: 'Instagram' },
    { icon: linkedin, label: 'Linkedin' },
];

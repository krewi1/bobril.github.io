import * as b from 'bobril';
import * as styles from '../../../components/styles';
import * as AppButton from '../../../components/appBar/button';
import * as Colors from '../../../components/colors';
import * as Image from '../../../components/image/lib';
import * as assets from '../../../assets/assets';

import * as BobrilLogoSection from './bobrilLogo';

interface IData {
}

interface IContext extends b.IBobrilCtx {
    data: IData;
}

let bobrilStyle = styles.createBobrilStylefromObjects(styles.headertext01, { color: Colors.color04 });
let isComponentStyle = styles.createBobrilStylefromObjects(styles.headertext02, { color: Colors.color04 });

export const create = b.createComponent<IData>({
    render(ctx: IContext, me: b.IBobrilNode) {
        const d = ctx.data;

        me.children = [
            BobrilLogoSection.create({
                onGetStartedClick: () => {
                }
            }),

            // b.styledDiv() 60 px??
            b.styledDiv(['BOBRIL'], bobrilStyle),

            b.styledDiv(['is a component-oriented framework for creating web applications inspired by'
                + ' ReactJs (Virtual DOM, components with state) and Mithril (small size, ,more commplete framework)'],
                isComponentStyle),

        ];

        b.style(
            me,
            {
                //height: '200px',
                background: Colors.color02,
            }
        );
    }
});
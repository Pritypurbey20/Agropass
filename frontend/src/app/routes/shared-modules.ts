import { LoginModule } from '../modules/login/login.module';
import { ThemeModule } from '../modules/theme/theme.module';
import { PageModule } from '../modules/page/page.module';
import { CoreModule } from '../core/core.module';

export const SharedModule = [
    LoginModule,
    CoreModule,
    ThemeModule,
    PageModule,
];
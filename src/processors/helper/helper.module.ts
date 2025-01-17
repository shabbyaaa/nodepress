/**
 * @file General helper module
 * @module processor/helper/module
 * @author Surmon <https://github.com/surmon-china>
 */

import { Module, Global } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { GoogleService } from './helper.service.google'
import { AkismetService } from './helper.service.akismet'
import { CloudStorageService } from './helper.service.cloud-storage'
import { EmailService } from './helper.service.email'
import { SeoService } from './helper.service.seo'
import { IPService } from './helper.service.ip'

const services = [GoogleService, AkismetService, CloudStorageService, EmailService, SeoService, IPService]

@Global()
@Module({
  imports: [HttpModule],
  providers: services,
  exports: services,
})
export class HelperModule {}

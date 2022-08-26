import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ApiConfigService } from '../../api-config/api-config.service';
import { CommonModule } from '../../common.module';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'BROKER_CLIENT',
        imports: [CommonModule],
        inject: [ApiConfigService],
        useFactory: async (apiConfig: ApiConfigService) => ({
          transport: Transport.MQTT,
          options: {
            hostname: apiConfig.mqttHostname,
            port: apiConfig.mqttPort,
            username: apiConfig.mqttUser,
            password: apiConfig.mqttPassword,
            protocol: apiConfig.mqttProtocol,
            protocolVersion: apiConfig.mqttProtocolVersion,
          },
        }),
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class MqttBrokerModule {}

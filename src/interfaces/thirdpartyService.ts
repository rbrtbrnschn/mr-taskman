export default interface ThirdpartyService {
  isGuildId(guildId: string): Promise<boolean>;
  // eslint-disable-next-line semi
}

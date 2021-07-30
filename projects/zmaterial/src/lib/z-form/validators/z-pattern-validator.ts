export const zIpPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export const zVehiclePlatePattern = '[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}|[A-Z]{3}[0-9]{4}';

export const zCpfPattern = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

export const zCnpjPattern = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;

export const zCpfCnpjPattern = /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/;

export const zTimePatternSeconds = /^([0-1]?\d|2[0-3])(?::([0-5]?\d))?(?::([0-5]?\d))$/;

export const zTimePatternNoSeconds = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

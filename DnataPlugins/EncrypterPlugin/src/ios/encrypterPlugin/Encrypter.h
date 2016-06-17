#import <Cordova/CDVPlugin.h>
#import <CommonCrypto/CommonCryptor.h>

@interface Encrypter : CDVPlugin

- (void)encrypt:(CDVInvokedUrlCommand*)command;

@end

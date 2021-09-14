#import "iPerceptions.h"
#import "iPerceptionsSDK.h"

@implementation Iperceptions

+ (BOOL) requiresMainQueueSetup {
  return YES;
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(initialize: (NSString *)apiKey){
  [iPerceptionsSDK initWithAPIToken: apiKey];
}

RCT_EXPORT_METHOD(clearCache){
  [iPerceptionsSDK clearCache];
}

RCT_EXPORT_METHOD(setInvitationWithTitleValues: (NSString *)title 
message: (NSString *)message
yesText: (NSString *)yesText
noText: (NSString *)noText
toastMessage: (NSString *)toastMessage) {
  [iPerceptionsSDK setInvitationWithTitle:title message:message yesText:yesText noText:noText];
  [iPerceptionsSDK setToastMessage:toastMessage];
}

RCT_EXPORT_METHOD(setIconAccessibility: (NSString *)accessibilityLabel){
  [iPerceptionsSDK setIconAccessibility: accessibilityLabel accessibilityTraits: UIAccessibilityTraitButton];
}

RCT_EXPORT_METHOD(triggerSurvey: (NSDictionary *)urlVariables
environment: (NSString *)environment
LOB: (NSString *)LOB)
{
  [iPerceptionsSDK setUrlVariables:urlVariables];
  [iPerceptionsSDK triggerEventWithValues: @{@"Language":@"English", @"Environment": environment, @"LOB": LOB} onViewController:UIApplication.sharedApplication.delegate.window.rootViewController];
}

RCT_EXPORT_METHOD(removeSurveyIcon){
  dispatch_async(dispatch_get_main_queue(), ^{
    [iPerceptionsSDK removeIcon];
  });
}

@end

//
//  iPerceptionsSDK.h
//  iPerceptionsSDK
//
//  Created by iPerceptions.com
//  Copyright (c) 2011-15 iPerceptions. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>
#import <WebKit/WKNavigationDelegate.h>

typedef NS_ENUM(NSInteger, IPIProjectType) {
    IPIProjectTypeSurvey,
    IPIProjectTypeCommentCard
};

typedef NS_ENUM(NSInteger, IPIIconPosition) {
    IPIIconPositionTopLeft,
    IPIIconPositionTopMiddle,
    IPIIconPositionTopRight,
    IPIIconPositionMiddleLeft,
    IPIIconPositionMiddleRight,
    IPIIconPositionBottomLeft,
    IPIIconPositionBottomMiddle,
    IPIIconPositionBottomRight
};


typedef NS_OPTIONS(NSUInteger, IPITriggerOptions) {
    IPIDefault               = 0,     // Default options (legacy behavior).
    IPISkipSurveyIconDisplay = 1      // Skip the display of the survey icon, go directly to the survey.
};


typedef NS_ENUM(NSUInteger, IPISurveyState) {
    IPISurveyStateDisplayed = 2,
    IPISurveyStateAccepted = 3
};

typedef NS_ENUM(NSUInteger, IPIToastPosition) {
    IPIToastPositionBottom,
    IPIToastPositionTop
};

typedef NS_ENUM(NSInteger, IPIInvitationButtonType) {
    IPIInvitationButtonYes,
    IPIInvitationButtonNo,
    IPIInvitationButtonOpenLink
};

typedef NS_ENUM(NSInteger, IPILogLevel) {
    IPILogLevelNormal,
    IPILogLevelVerbose,
};

@interface iPerceptionsSDK : NSObject<WKNavigationDelegate>


+ (void)initWithAPIToken:(NSString *)apiToken;


/**
 *  Validate if any project (survey/commentCard) must be triggered.
 *  Similar to calling triggerEventWithValues:onViewController:withOptions: with the option IPIDefault.
 *
 *  @param values
 *  @param viewController The UIViewController that will contains the icon.
 */
+ (void)triggerEventWithValues:(NSDictionary *)values onViewController:(UIViewController *)viewController;

/**
 *  Validate if any project (survey/commentCard) must be triggered.
 *
 *  @param values
 *  @param viewController The UIViewController that will contains the icon.
 *  @param mask        A mask of options to use when triggering a project. IPIDefault can be specified to use default options.
 */
+ (void)triggerEventWithValues:(NSDictionary *)values onViewController:(UIViewController *)viewController withOptions:(IPITriggerOptions)mask;

+ (void)clearCache;

+ (void)setUrlVariables:(NSDictionary *)urlVariables;

/**
 *  Set invitation alert title and button text
 *
 *  @param title The title to display at the top of the alert
 *  @param message longer message to display on the alert
 *  @param yesText Text for the "Yes" button
 *  @param noText  Text for the "No" button
 *  @param openLinkText If set, the presented alert will include a third option with this text. Can be nil.
 *  @param openLinkURL If set, the presented alert will include a third option - to open this URL. Can be nil.
 */
+ (void)setInvitationWithTitle:(NSString *)title message:(NSString *)message yesText:(NSString *)yesText noText:(NSString *)noText openLinkText:(NSString *)openLinkText openLinkURL:(NSURL *)openLinkURL;

+ (void)setInvitationWithTitle:(NSString *)title message:(NSString *)message yesText:(NSString *)yesText noText:(NSString *)noText;


/**
 * Set invitation button ordering
 *
 * @param order Array of NSNumbers representing IPI IPIInvitationButtonType values. Buttons will be top to bottom by array order.
 */
+ (void)setInvitationButtonOrder:(NSArray *)order;

+ (void)setToastMessage:(NSString *)message;

+ (void)setIconPosition:(IPIIconPosition) iconPosition forProjectType:(IPIProjectType) projectType;

/**
 *  Enable/disable iCloud support. Disabled by default.
 *
 *  @param enable True to enable iCloud support.
 */
+ (void)enableICloud:(BOOL)enable;

/**
 *  Indicates if iCloud is enabled.
 *
 *  @return True if iCloud is enabled.
 */
+ (BOOL)isICloudEnabled;

/**
 *  Indicates if ANY PROJECT (surveys only) has displayed an invitation since the specified date.
 *  The user does not need to accept/decline or start the survey, just see the invite.
 *
 *  @param date Since date
 *
 *  @return YES if any project's invite has been shown.
 */
+ (BOOL)isInviteShownSince:(NSDate*)date;

/**
 *  Indicates if A SPECIFIC PROJECT (surveys only) has displayed an invitation since the specified date.
 *  The user does not need to accept/decline or start the survey, just see the invite.
 *
 *  @param date     Since date
 *  @param projectId The ID of the project
 *
 *  @return YES if any project's invite has been shown.
 */
+ (BOOL)isInviteShownSince:(NSDate*)date withProjectId:(NSInteger)projectId;

/**
 *  Set the ID of the site to be tracked
 *
 *  @param siteId ID of the site to be tracked
 */
+ (void)setSiteID:(NSString *)siteId;

/**
 *  Set the Toast position By default the position is Bottom
 *
 *  @param position of the Toast in the view
 *  @param offset the offset of the toast in the view (from top is Position is Top, and from Bottom if position is Bottom)
 *
 */
+ (void)setToastPosition:(IPIToastPosition)position offset:(CGFloat)offset;


+ (void)setOpenLinkText:(NSString *)text url:(NSURL *)url;

+ (void)setLogLevel:(IPILogLevel)verbosity;

+ (void)setIconAccessibility:(NSString *)accessibilityLabel accessibilityTraits:(UIAccessibilityTraits)accessibilityTraits;

+ (void)removeIcon;
@end

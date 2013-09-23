#import "AppDelegate.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
     UIViewController *feedViewController = [[UIViewController alloc] init];
     feedViewController.title = @"Feed";
     feedViewController.tabBarItem.image = [UIImage imageNamed:@"tab_icon_feed"];

     UIViewController *favoritesViewController = [[UIViewController alloc] init];
     favoritesViewController.title = @"Favorites";

     UIViewController *profileViewController = [[UIViewController alloc] init];
     profileViewController.title = @"Profile";

     UITabBarController *tabBarController = [[UITabBarController alloc] init];
     [tabBarController setViewControllers:@[feedViewController, favoritesViewController, profileViewController]];

     self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
     self.window.rootViewController = tabBarController;
     // Override point for customization after application launch.
     self.window.backgroundColor = [UIColor whiteColor];
     [self.window makeKeyAndVisible];

     favoritesViewController.tabBarItem.image = [UIImage imageNamed:@"tab_icon_favorites"];
     profileViewController.tabBarItem.image = [UIImage imageNamed:@"tab_icon_profile"];
     return YES;
}
@end



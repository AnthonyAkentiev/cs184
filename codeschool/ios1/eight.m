// Tab + Nav
#import "AppDelegate.h"
#import "FeedViewController.h"
#import "ProfileViewController.h"
#import "FavoritesViewController.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
     ProfileViewController *profileViewController = [[ProfileViewController alloc] init];
     UINavigationController *profileNavController = [[UINavigationController alloc] initWithRootViewController:profileViewController];

     FeedViewController *feedViewController = [[FeedViewController alloc] init];
     UINavigationController *feedNavController = [[UINavigationController alloc] initWithRootViewController:feedViewController];

     FavoritesViewController *favoritesViewController = [[FavoritesViewController alloc] init];
     UINavigationController *favNavController = [[UINavigationController alloc] initWithRootViewController:favoritesViewController];

     UITabBarController *tabController = [[UITabBarController alloc] init];
     tabController.viewControllers = @[feedNavController,favNavController,profileNavController];

     self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
     self.window.rootViewController = tabController;
     [self.window makeKeyAndVisible];
     return YES;
}
@end


#import "ProfileViewController.h"
#import "UIImageView+AFNetworking.h"
#import "AFJSONRequestOperation.h"

@implementation ProfileViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
     self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
     if (self) {
          self.title = @"Profile";
          self.tabBarItem.image = [UIImage imageNamed:@"tab_icon_profile"];
     }
     return self;
}

- (void)viewDidLoad
{
     [super viewDidLoad];
     self.view.backgroundColor = [UIColor whiteColor];

     UIImageView *profileImageView = [[UIImageView alloc] init];
     profileImageView.frame = CGRectMake(20, 20, 100, 114);

     UIImage *placeholder = [UIImage imageNamed: @"placeholder.jpg"];
     NSURL *imageURL = [NSURL URLWithString:@"http://tryios.codeschool.com/higgie_profile_image.png"];

     [profileImageView setImageWithURL:imageURL placeholderImage:placeholder];
     profileImageView.image = placeholder;

     [self.view addSubview:profileImageView];

     NSURL *url = [[NSURL alloc] initWithString:@"http://tryios.codeschool.com/userProfile.json"];

     NSURLRequest *request = [[NSURLRequest alloc] initWithURL:url];

     AFJSONRequestOperation *operation = [AFJSONRequestOperation
          JSONRequestOperationWithRequest:request
          success:^(NSURLRequest *request, NSHTTPURLResponse *response, id JSON){
               NSLog(@"Returned JSON is: %@", JSON);
          } failure:^(NSURLRequest *request, NSHTTPURLResponse *response, NSError *error, id JSON){
               NSLog(@"%@", error.localizedDescription);
          }];

     [operation start];
}


@end

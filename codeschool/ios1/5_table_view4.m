#import <UIKit/UIKit.h>

@interface PhotoViewController : UIViewController

@property (weak, nonatomic) NSString *imageFileName;
@property (weak, nonatomic) NSString *imageTitle;

@end

/////////////////////////////
#import "PhotoViewController.h"

@implementation PhotoViewController

-(void)viewDidLoad {
     UIImageView *imageView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:self.imageFileName]];
     imageView.frame = CGRectMake(10,10,300,300);          
     [self.view addSubview:imageView];

     UILabel *imageTitleLabel = [[UILabel alloc] init];

     imageTitleLabel.text = self.imageTitle;// Set the image title here

     imageTitleLabel.frame = CGRectMake(10,320,300,40);
     [self.view addSubview:imageTitleLabel];
}
@end

/////////////////////////////
#import "FeedTableViewController.h"
#import "PhotoViewController.h"

@implementation FeedTableViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
     self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
     if (self) {
          self.title = @"Feed";
          self.tabBarItem.image = [UIImage imageNamed:@"tab_icon_feed.png"];
          self.imageTitleArray = @[@"Image 1", @"Image 2", @"Image 3", @"Image 4", @"Image 5"];
          self.imageFileNameArray = @[@"image1.png", @"image2.png", @"image3.png", @"image4.png", @"image5.png"];
     }
     return self;
}

- (NSInteger)tableView:(UITableView *)tableView
numberOfRowsInSection:(NSInteger)section
{
     return self.imageTitleArray.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView
cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
     UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"Cell"];

     if(cell == nil) {
          cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:@"Cell"];
     }

     cell.textLabel.text = self.imageTitleArray[indexPath.row];

     return cell;
}

-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
     PhotoViewController *photoVC = [[PhotoViewController alloc] init];
     photoVC.imageFileName = self.imageFileNameArray[indexPath.row];

     // Set the new property here
     photoVC.imageTitle = self.imageTitleArray[indexPath.row];

     [self.navigationController pushViewController:photoVC animated:YES];
}

@end

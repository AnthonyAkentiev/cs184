// TableViewController

#import "FeedTableViewController.h"
#import "PhotoViewController.h"
#import "AFJSONRequestOperation.h"
#import "UIImageView+AFNetworking.h"
#import "Photo.h"

@implementation FeedTableViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
     self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
     if (self) {
          self.title = @"Feed";
          self.tabBarItem.image = [UIImage imageNamed:@"tab_icon_feed.png"];
     }
     return self;
}

- (void)viewDidLoad
{
     NSURL *url = [[NSURL alloc] initWithString:@"http://operation-models.codeschool.com/feedImages.json"];
     NSURLRequest *request = [[NSURLRequest alloc] initWithURL:url];

     AFJSONRequestOperation *operation = [AFJSONRequestOperation JSONRequestOperationWithRequest:request success:^(NSURLRequest *request, NSHTTPURLResponse *response, id JSON) {

          NSMutableArray *temp = [[NSMutableArray alloc] init];

          for (NSDictionary *image in JSON) {
               Photo *photo = [[Photo alloc] initWithTitle:image[@"title"]
                    detail:image[@"detail"]
                    filename:image[@"filename"]
                    thumbnail:image[@"thumbnail"]];
               [temp addObject:photo];
          }

          self.photos = [[NSArray alloc] initWithArray:temp];

          [self.tableView reloadData];
     } failure:^(NSURLRequest *request, NSHTTPURLResponse *response, NSError *error, id JSON) {
          NSLog(@"NSError: %@",[error localizedDescription]);
     }];

     [operation start];
}

- (NSInteger)tableView:(UITableView *)tableView
numberOfRowsInSection:(NSInteger)section
{
     return self.photos.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView
cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
     UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"Cell"];

     if(cell == nil) {
          cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:@"Cell"];
     }

     cell.textLabel.text = [self.photos[indexPath.row] title];
     cell.detailTextLabel.text = [self.photos[indexPath.row] detail];

     return cell;
}

-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
}
@end

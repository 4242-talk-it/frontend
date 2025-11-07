import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, User, Grid, List } from 'lucide-react';
import TopButton from '../../component/button/TopButton';
import CreateButton from '../../component/button/CreateButton';

const CommunityPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [viewMode, setViewMode] = useState('grid');

  const [isTopButtonVisible, setIsTopButtonVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsTopButtonVisible(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  const renderButton = () => (
    <aside> 
      <div className="fixed bottom-6 right-[calc(50%-600px)] flex flex-col gap-3 z-50">
        <CreateButton
          onClick={() => navigate(`/community/create`)} // 고정 경로로 변경
          isTopButtonVisible={isTopButtonVisible}
        />
        {isTopButtonVisible && <TopButton />}
      </div>
    </aside>
  );
  
  const categories = ['전체', '대화후기', '일상공유', '궁금해요', '대화꿀팁', '인기글'];

  const posts = [
    {
      id: 1,
      author: '익명의 대화러',
      time: '12분 전',
      category: '대화후기',
      title: '오늘 첫 말잇기 도전했는데 생각보다 나쁘지 않고 좋았어요!',
      content: '처음에는 정말 떨렸는데, 상대방이 너무 따뜻하게 대해줘서 너무 좋았어요. 10시간 이렇게 빨리 갈 줄 몰랐네요. 대화에도 도움 많이...',
      tags: ['#오늘', '#떨림', '#따뜻함'],
      likes: 24,
      comments: 12,
      views: 156,
      categoryColor: 'bg-blue-100 text-blue-600'
    },
    {
      id: 2,
      author: '햇살처럼',
      time: '25분 전',
      category: '일상공유',
      title: '오늘 카페에서 만난 새로운 인연 😊',
      content: '평소 낯가림이 심해서 사이사이에서 연습한 대화법으로 말 걸었는데 친구로 이어질 수 있을지도! 너무나도 기분 좋은 오늘입니다. 정말로 배운 덕분이에요! 대화에서 배운 건...',
      tags: ['#카페', '#새친구', '#새로운만남'],
      likes: 18, 
      comments: 8,
      views: 203,
      categoryColor: 'bg-orange-100 text-orange-600'
    },
    {
      id: 3,
      author: '궁금이',
      time: '1시간 전',
      category: '궁금해요',
      title: '대화할 때 침묵이 흐르면 어떻게 해야 할까요?',
      content: '말잇기 하면서 가끔 할 말이 없어서 멈칫하게 될 때가 많아요. 이럴 때, 어떤 상황에서든지 자연스럽게 흘러갈 수 있는 방법이 있을까요?',
      tags: ['#대화팁', '#침묵', '#대처방법'],
      likes: 15,
      comments: 23,
      views: 342,
      categoryColor: 'bg-purple-100 text-purple-600'
    },
    {
      id: 4,
      author: '대화마스터',
      time: '2시간 전',
      category: '대화꿀팁',
      title: '경청의 기술: 상대방의 말을 제대로 듣는 방법',
      content: '많은 사람들이 대화할 때 자기 말만 하려고 하는데, 진정한 대화는 경청에서 시작됩니다. 오늘은 제가 실천하고 있는 경청 팁을 공유해볼게요...',
      tags: ['#경청', '#대화기술', '#소통'],
      likes: 42,
      comments: 15,
      views: 567,
      categoryColor: 'bg-yellow-100 text-yellow-700'
    },
    {
      id: 5,
      author: '소심이',
      time: '3시간 전',
      category: '일상공유',
      title: '첫 대면 약속 잡았어요! 너무 떨려요 ㅠㅠ',
      content: '사이사이에서 한 달 동안 대화하던 분과 드디어 만나기로 했는데... 설레기도 하고 떨리기도 하네요. 어떤 옷을 입고 가야 할지, 어떤 이야기를...',
      tags: ['#첫만남', '#떨림', '#설렘'],
      likes: 31,
      comments: 19,
      views: 289,
      categoryColor: 'bg-orange-100 text-orange-600'
    },
    {
      id: 6,
      author: '질문왕',
      time: '5시간 전',
      category: '궁금해요',
      title: '대화 주제가 항상 고갈되는데 어떻게 하나요?',
      content: '대화를 시작하면 처음 10분은 좋은데 그 이후로는 할 말이 없어져요. 여러분은 어떻게 대화 주제를 계속 이어가시나요?',
      tags: ['#대화주제', '#고민', '#조언구함'],
      likes: 27,
      comments: 34,
      views: 421,
      categoryColor: 'bg-purple-100 text-purple-600'
    },
    {
      id: 7,
      author: '익명의 대화러',
      time: '12분 전',
      category: '대화후기',
      title: '오늘 첫 말잇기 도전했는데 생각보다 나쁘지 않고 좋았어요!',
      content: '처음에는 정말 떨렸는데, 상대방이 너무 따뜻하게 대해줘서 너무 좋았어요. 10시간 이렇게 빨리 갈 줄 몰랐네요. 대화에도 도움 많이...',
      tags: ['#오늘', '#떨림', '#따뜻함'],
      likes: 24,
      comments: 12,
      views: 156,
      categoryColor: 'bg-blue-100 text-blue-600'
    },
    {
      id: 8,
      author: '햇살처럼',
      time: '25분 전',
      category: '일상공유',
      title: '오늘 카페에서 만난 새로운 인연 😊',
      content: '평소 낯가림이 심해서 사이사이에서 연습한 대화법으로 말 걸었는데 친구로 이어질 수 있을지도! 너무나도 기분 좋은 오늘입니다. 정말로 배운 덕분이에요! 대화에서 배운 건...',
      tags: ['#카페', '#새친구', '#새로운만남'],
      likes: 18, 
      comments: 8,
      views: 203,
      categoryColor: 'bg-orange-100 text-orange-600'
    },
    {
      id: 9,
      author: '궁금이',
      time: '1시간 전',
      category: '궁금해요',
      title: '대화할 때 침묵이 흐르면 어떻게 해야 할까요?',
      content: '말잇기 하면서 가끔 할 말이 없어서 멈칫하게 될 때가 많아요. 이럴 때, 어떤 상황에서든지 자연스럽게 흘러갈 수 있는 방법이 있을까요?',
      tags: ['#대화팁', '#침묵', '#대처방법'],
      likes: 15,
      comments: 23,
      views: 342,
      categoryColor: 'bg-purple-100 text-purple-600'
    },
    {
      id: 10,
      author: '대화마스터',
      time: '2시간 전',
      category: '대화꿀팁',
      title: '경청의 기술: 상대방의 말을 제대로 듣는 방법',
      content: '많은 사람들이 대화할 때 자기 말만 하려고 하는데, 진정한 대화는 경청에서 시작됩니다. 오늘은 제가 실천하고 있는 경청 팁을 공유해볼게요...',
      tags: ['#경청', '#대화기술', '#소통'],
      likes: 42,
      comments: 15,
      views: 567,
      categoryColor: 'bg-yellow-100 text-yellow-700'
    },
    {
      id: 11,
      author: '소심이',
      time: '3시간 전',
      category: '일상공유',
      title: '첫 대면 약속 잡았어요! 너무 떨려요 ㅠㅠ',
      content: '사이사이에서 한 달 동안 대화하던 분과 드디어 만나기로 했는데... 설레기도 하고 떨리기도 하네요. 어떤 옷을 입고 가야 할지, 어떤 이야기를...',
      tags: ['#첫만남', '#떨림', '#설렘'],
      likes: 31,
      comments: 19,
      views: 289,
      categoryColor: 'bg-orange-100 text-orange-600'
    },
    {
      id: 12,
      author: '질문왕',
      time: '5시간 전',
      category: '궁금해요',
      title: '대화 주제가 항상 고갈되는데 어떻게 하나요?',
      content: '대화를 시작하면 처음 10분은 좋은데 그 이후로는 할 말이 없어져요. 여러분은 어떻게 대화 주제를 계속 이어가시나요?',
      tags: ['#대화주제', '#고민', '#조언구함'],
      likes: 27,
      comments: 34,
      views: 421,
      categoryColor: 'bg-purple-100 text-purple-600'
    }
  ];

  const getFilteredPosts = (posts, selectedCategory) => {
  if (selectedCategory === '전체') return posts;
  if (selectedCategory === '인기글') return posts.filter(post => post.likes > 20);
  return posts.filter(post => post.category === selectedCategory);
};

const filteredPosts = getFilteredPosts(posts, selectedCategory);


  const handlePostClick = (postId) => {
    console.log(`Navigate to post detail page: ${postId}`);
    // 실제 구현시 라우팅 로직 추가
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-purple-50 to-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <span className="text-5xl">💬</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">함께 나누는 이야기</h1>
          <p className="text-gray-600 mb-8">대화 후기부터 일상의 소소한 이야기까지, 마음껏 공유해보세요</p>
          
          <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-green-400">1,247</div>
              <div className="text-sm text-gray-500 mt-1">게시글</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-green-400">3,829</div>
              <div className="text-sm text-gray-500 mt-1">댓글</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-green-400">856</div>
              <div className="text-sm text-gray-500 mt-1">활동 멤버</div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-b sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-4">
            <div className="flex overflow-x-auto gap-2 flex-1 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 sm:px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-green-400 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category === '전체' && '⭐ '}
                  {category === '대화후기' && '💭 '}
                  {category === '일상공유' && '🌟 '}
                  {category === '궁금해요' && '❓ '}
                  {category === '대화꿀팁' && '💡 '}
                  {category === '인기글' && '🔥 '}
                  {category}
                </button>
              ))}
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white shadow-sm text-green-500'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
                title="앨범형"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-all ${
                  viewMode === 'list'
                    ? 'bg-white shadow-sm text-green-500'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
                title="리스트형"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'grid' ? (
          // Grid View (앨범형)
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => handlePostClick(post.id)}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 hover:border-green-200"
              >
                {/* Author Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800 text-sm">{post.author}</div>
                      <div className="text-xs text-gray-400">{post.time}</div>
                    </div>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="mb-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${post.categoryColor}`}>
                    {post.category}
                  </span>
                </div>

                {/* Post Content */}
                <h3 className="font-bold text-gray-800 mb-2 text-base sm:text-lg line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.content}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </div>
                  <div className="ml-auto text-xs">
                    조회 {post.views}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // List View (리스트형)
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => handlePostClick(post.id)}
                className="bg-white rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 hover:border-green-200"
              >
                <div className="flex gap-4">
                  {/* Author Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-medium text-gray-800">{post.author}</span>
                      <span className="text-xs text-gray-400">{post.time}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${post.categoryColor}`}>
                        {post.category}
                      </span>
                    </div>

                    <h3 className="font-bold text-gray-800 mb-2 text-lg">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {post.content}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </div>
                      <div className="text-xs">
                        조회 {post.views}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-gray-500">아직 게시글이 없습니다.</p>
            <p className="text-gray-400 text-sm mt-2">첫 게시글을 작성해보세요!</p>
          </div>
        )}
      </div>
      {renderButton()}
    </div>
  );
};

export default CommunityPage;
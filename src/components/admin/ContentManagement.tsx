import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Image, Plus, Trash2, Eye, EyeOff, Sparkles, Check, RefreshCw, Layers } from 'lucide-react';

export const ContentManagement: React.FC = () => {
  const { 
    banners, 
    addBanner, 
    toggleBannerActive, 
    deleteBanner, 
    settings, 
    updateMarqueeNotice 
  } = useApp();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tag, setTag] = useState('SPECIAL PROMO');
  const [noticeInput, setNoticeInput] = useState(settings.marqueeNotice);
  const [noticeSaved, setNoticeSaved] = useState(false);

  // High quality sports photo presets (including the requested Julian Alvarez World Cup photo theme)
  const PRESET_IMAGES = [
    {
      name: 'আর্জেন্টিনা ফুটবল স্পেশাল (Julian Alvarez / World Cup)',
      url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
      tag: 'WORLD CUP PROMO'
    },
    {
      name: 'গোল্ডেন ক্যাসিনো রয়্যাল (Casino Royal)',
      url: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1200&q=80',
      tag: 'VIP CASINO'
    },
    {
      name: 'লাইভ ক্রিকেট এবং স্পোর্টস (Cricket Betting)',
      url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80',
      tag: 'LIVE ODDS'
    },
    {
      name: 'bKash/Nagad ১০% বোনাস অফার',
      url: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=1200&q=80',
      tag: 'CASHBACK'
    }
  ];

  const handleAddBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) {
      alert('শিরোনাম এবং ছবির URL দিন');
      return;
    }

    addBanner({
      title,
      subtitle: subtitle || 'অফার চলাকালীন ডিপোজিট করে পান আকর্ষণীয় বোনাস!',
      imageUrl,
      tag: tag || 'PROMO',
      active: true
    });

    setTitle('');
    setSubtitle('');
    setImageUrl('');
    alert('নতুন ব্যানার ছবি সফলভাবে যুক্ত হয়েছে!');
  };

  const handleSaveNotice = () => {
    updateMarqueeNotice(noticeInput);
    setNoticeSaved(true);
    setTimeout(() => setNoticeSaved(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#D4AF37]/20 pb-4">
        <h2 className="text-xl font-black text-white flex items-center gap-2">
          <Image className="w-6 h-6 text-[#00BFFF]" />
          <span>কন্টেন্ট ও ব্যানার ব্যবস্থাপনা (Content & Banner Studio)</span>
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          অ্যাডমিন হিসেবে ড্যাশবোর্ড এবং প্লেয়ার পোর্টালের ব্যানার ছবি, নোটিশ ও প্রচারণা আপডেট করুন।
        </p>
      </div>

      {/* Marquee Notice Manager */}
      <div className="bg-[#0f0f0f] border border-[#D4AF37]/30 p-5 rounded-2xl shadow-xl">
        <h3 className="text-sm font-bold text-[#FFD700] mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#FFD700]" />
          <span>সাইটের চলন্ত নোটিশ (Marquee Announcement Notice)</span>
        </h3>
        <p className="text-xs text-gray-400 mb-3">
          এই টেক্সটটি প্লেয়ার ও অ্যাডমিন উভয়ের হোম পেজে স্ক্রোলিং নোটিশ হিসেবে ভেসে উঠবে:
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={noticeInput}
            onChange={(e) => setNoticeInput(e.target.value)}
            className="flex-1 bg-[#050505] border border-[#D4AF37]/40 rounded-xl px-4 py-2.5 text-xs text-white font-medium focus:outline-none focus:border-[#FFD700]"
          />
          <button
            onClick={handleSaveNotice}
            className="bg-gold-button font-bold text-slate-950 px-5 py-2.5 rounded-xl text-xs hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 shadow-md shrink-0"
          >
            {noticeSaved ? <Check className="w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
            <span>{noticeSaved ? 'সংরক্ষিত!' : 'আপডেট নোটিশ'}</span>
          </button>
        </div>
      </div>

      {/* Add New Banner Form */}
      <div className="bg-[#0f0f0f] border border-[#00BFFF]/30 p-6 rounded-2xl shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-[#00BFFF] flex items-center gap-2">
          <Plus className="w-4 h-4 text-[#00BFFF]" />
          <span>নতুন ব্যানার ও প্রচারণামূলক ছবি যোগ করুন (Add Banner Image)</span>
        </h3>

        {/* Quick Presets Selection */}
        <div>
          <label className="block text-xs font-bold text-gray-300 mb-2">
            দ্রুত ছবি নির্বাচন করুন (Quick Preset Selection):
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            {PRESET_IMAGES.map((preset, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setImageUrl(preset.url);
                  setTag(preset.tag);
                }}
                className={`p-2 rounded-xl border cursor-pointer transition-all flex flex-col gap-1.5 ${
                  imageUrl === preset.url
                    ? 'bg-[#00BFFF]/20 border-[#00BFFF] shadow-[0_0_10px_rgba(0,191,255,0.4)]'
                    : 'bg-[#050505] border-white/10 hover:border-[#00BFFF]/50'
                }`}
              >
                <img src={preset.url} alt="Preset" className="w-full h-24 object-cover rounded-lg" />
                <span className="text-[11px] font-bold text-gray-200 line-clamp-1">{preset.name}</span>
                <span className="text-[9px] text-[#00BFFF] uppercase font-bold">{preset.tag}</span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleAddBanner} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                 ব্যানারের নাম / শিরোনাম (Title):
              </label>
              <input
                type="text"
                placeholder="যেমন: বিশ্বকাপ ফুটবল ২০২৬ সুপার ধামাকা"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#050505] border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#00BFFF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                ট্যাগ (Badge Tag):
              </label>
              <input
                type="text"
                placeholder="যেমন: SPORTS PROMO / WELCOME BONUS"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full bg-[#050505] border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#00BFFF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              ছবির URL (Image URL):
            </label>
            <input
              type="text"
              placeholder="https://images.unsplash.com/..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-[#050505] border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#00BFFF]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              সাবটাইটেল / বিবরণ (Subtitle):
            </label>
            <input
              type="text"
              placeholder="সংক্ষিপ্ত বিবরণ লিখুন..."
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full bg-[#050505] border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#00BFFF]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#00BFFF] via-cyan-400 to-[#0099DD] font-black text-slate-950 py-3 rounded-xl hover:brightness-110 active:scale-98 transition-all text-xs shadow-lg"
          >
            ব্যানার গ্যালাড়িতে যুক্ত করুন (Add Banner Image)
          </button>
        </form>
      </div>

      {/* Existing Active Banners List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#FFD700]" />
          <span>বর্তমান সক্রিয় ব্যানারের তালিকা ({banners.length})</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {banners.map(banner => (
            <div
              key={banner.id}
              className={`bg-[#0f0f0f] border p-4 rounded-2xl flex flex-col justify-between gap-3 shadow-xl transition-all ${
                banner.active ? 'border-[#FFD700]/40 shadow-[0_0_15px_rgba(212,175,55,0.15)]' : 'border-white/10 opacity-60'
              }`}
            >
              <div className="relative rounded-xl overflow-hidden aspect-[21/9]">
                <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-[#FFD700] text-slate-950 font-black text-[10px] px-2 py-0.5 rounded shadow">
                  {banner.tag}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm">{banner.title}</h4>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{banner.subtitle}</p>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-3">
                <button
                  onClick={() => toggleBannerActive(banner.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    banner.active ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  {banner.active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{banner.active ? 'প্রদর্শিত হচ্ছে' : 'হাইড করা'}</span>
                </button>

                <button
                  onClick={() => deleteBanner(banner.id)}
                  className="p-1.5 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                  title="ডিলিট করুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import cn from "classnames";
import { FormEngine } from '../core/FormEngine';
import { useState } from 'react';
import { Page } from '../core/Page';
import { MdAdd } from 'react-icons/md';
import { PageBuilder } from '../ui/PageBuilder';
import { DraggableChoiceList } from '../ui/DraggableChoiceList';
import { typeToReadable } from '../core/form_utils';
import FieldEngine from '../core/FieldEngine';
import { useEffect } from 'react';
import { useMemo } from 'react';

export default function Home() {
  const [engine, setEngine] = useState(new FormEngine().addPage(new Page().setTitle(`Page 1`)));
  const [activePage, setActivePage] = useState<string>(engine.pages[0].key);
  const [highlighted, setHighlighted] = useState<string>();

  useEffect(() => {
    setHighlighted(undefined);
  }, [activePage])

  function addPage() {
    let newPage = new Page().setTitle(`Page ${engine.pages.length + 1}`);
    setEngine(engine.copy.addPage(newPage));
  }

  function updateActivePage(next: Page) {
    setEngine(engine.copy.updatePage(next))
    setActivePage(next.key);
  }

  const activePageEngine = useMemo(() => {
    return engine.pages.find((p) => p.key === activePage)
  }, [activePage, engine]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Polyfill.me</title>
        <meta name="description" content="Create forms" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <header className={styles.header}>
          <h4>Polyfill.me</h4>
        </header>
        <section className={styles.structure_wrapper}>
          <div className={cn(styles.structure, styles.structure_pages)}>
            <header>
              <h5>Pages</h5>
              <div className={styles.actions}>
                <button onClick={addPage}>
                  <MdAdd size={18} />
                </button>
              </div>
            </header>
            <div className={styles.content_wrapper}>
              <ul className={"item_list "+styles.content}>
                {
                  engine.pages.map((p) => {
                    return <li key={p.key} className={styles.page_item} onClick={() => setActivePage(p.key)} data-active={activePage === p.key}>
                      {p.title}
                    </li>
                  })
                }
              </ul>
            </div>
          </div>
          <div className={cn(styles.structure, styles.structure_composition)}>
            <header>
              <h5>Composition</h5>
              <div className={styles.actions}>
                <button>
                  <MdAdd size={18} />
                </button>
              </div>
            </header>
            <div className={styles.content_wrapper}>
              {activePageEngine && <ul className={"item_list "+styles.content}>
                {
                  activePageEngine.fields.map((f) => {
                    return <li key={f.key} className={styles.field_item} onClick={() =>setHighlighted(f.key)} data-active={f.key === highlighted}>
                      <span className={styles.title}>{f.title || "Sans titre"}</span>
                      <span className={styles.type}>{typeToReadable(f.type)}</span>
                    </li>
                  })
                }
              </ul>}
            </div>
          </div>
        </section>
        <section className={styles.base_wrapper}>
          <div className={styles.builder_wrapper}>
            {
              activePageEngine && <PageBuilder page={activePageEngine} fieldToHighlight={highlighted} onChange={updateActivePage} />
            }
          </div>
        </section>
        <section className={styles.details_wrapper}>
          <div className={styles.tabs_details}>
            <div className={styles.tab}>
              <h5>Edition</h5>
            </div>
            <div className={styles.tab}>
              <h5>Choix</h5>
            </div>
          </div>
          <div className={styles.tab_content}>
            <DraggableChoiceList />
          </div>
        </section>
      </main>
    </div>
  )
}
